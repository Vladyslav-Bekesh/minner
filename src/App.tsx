import React, { useMemo, useState } from "react";
import "./App.css";

const MINE = -1;

enum Mask {
  Transparent,
  Filled,
  Flag,
  Question,
}

const mapMaskToView: Record<number, React.ReactNode> = {
  [Mask.Transparent]: null,
  [Mask.Filled]: "🫓",
  [Mask.Flag]: "🚩",
  [Mask.Question]: "❓",
};

function App() {
  const size = 10;
  const dimension = new Array(size).fill(null);

  const [die, setDeath] = React.useState(false);
  const [field, setField] = React.useState<number[]>(() => createField(size));
  const [mask, setMask] = React.useState<number[]>(
    new Array(size * size).fill(Mask.Filled)
  );

  const win = React.useMemo(
    () =>
      !field.some(
        (f, i) =>
          f === MINE && mask[i] !== Mask.Flag && mask[i] !== Mask.Transparent
      ),
    [field, mask]
  );

  function createField(size: number): number[] {
    const field: number[] = new Array(size * size).fill(0);

    function inc(x: number, y: number) {
      if (x >= 0 && y >= 0 && x < size && y < size) {
        if (field[y * size + x] === MINE) return;

        field[y * size + x] += 1;
      }
    }

    for (let i = 0; i < size; i++) {
      const x = Math.floor(Math.random() * size);
      const y = Math.floor(Math.random() * size);

      if (field[y * size + x] === MINE) continue;
      field[y * size + x] = MINE;

      i += 1;

      inc(x + 1, y);
      inc(x - 1, y);
      inc(x, y + 1);
      inc(x, y - 1);
      inc(x - 1, y - 1);
      inc(x + 1, y + 1);
      inc(x - 1, y + 1);
      inc(x + 1, y - 1);
    }
    return field;
  }

  return (
    <div style={{ width: "400px", margin: "0 auto" }}>
      {dimension.map((_, y) => {
        return (
          <div key={y} style={{ display: "flex" }}>
            {dimension.map((_, x) => {
              return (
                <div
                  key={x}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "40px",
                    height: "40px",
                    backgroundColor: die ? "red" : win ? "#ffb" : "#beb",
                  }}
                  onClick={() => {
                    if (mask[y * size + x] === Mask.Transparent) return;

                    const clearing: [number, number][] = [];

                    function clear(x: number, y: number) {
                      if (x >= 0 && y >= 0 && x < size && y < size) {
                        if (mask[y * size + x] === Mask.Transparent) return;
                        clearing.push([x, y]);
                      }
                    }

                    clear(x, y);

                    while (clearing.length) {
                      const [x, y] = clearing.pop()!!;

                      mask[y * size + x] = Mask.Transparent;

                      if (field[y * size + x] !== 0) continue;

                      clear(x + 1, y);
                      clear(x - 1, y);
                      clear(x, y + 1);
                      clear(x, y - 1);
                    }
                    if (field[y * size + x] === MINE) {
                      mask.forEach((_, i) => {
                        mask[i] = Mask.Transparent;
                      });
                      setDeath(true);
                    }
                    setMask((prev) => [...prev]);
                  }}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    if (mask[y * size + x] === Mask.Transparent) return;

                    if (mask[y * size + x] === Mask.Filled) {
                      mask[y * size + x] = Mask.Flag;
                    } else if (mask[y * size + x] === Mask.Flag) {
                      mask[y * size + x] = Mask.Question;
                    } else if (mask[y * size + x] === Mask.Question) {
                      mask[y * size + x] = Mask.Filled;
                    }

                    if (field[y * size + x]) {
                    }

                    setMask((prev) => [...prev]);
                  }}
                >
                  {mask[y * size + x] !== Mask.Transparent
                    ? mapMaskToView[mask[y * size + x]]
                    : field[y * size + x] === MINE
                    ? "💣"
                    : field[y * size + x]}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default App;
