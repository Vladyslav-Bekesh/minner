import React, { useState } from "react";
import "./App.css";

const MINE = -1;

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

function App() {
  const size = 10;
  const dimension = new Array(size).fill(null);
  const [field, setField] = useState<number[]>(() => createField(size));
  const [mask, setMask] = useState<number[]>();
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
    <div className="App">
      {dimension.map((_, y) => {
        console.log(field);

        return (
          <div style={{ display: "flex" }}>
            {dimension.map((_, x) => {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "40px",
                    height: "40px",
                    backgroundColor: field[y * size + x] === MINE ? 'red' : "#beb",
                    margin: 1
                  }}
                >
                  {field[y * size + x] === MINE ? '💣' : field[y * size + x]}
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
