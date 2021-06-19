import React, { useState } from 'react';
import useLaze from 'react-laze';

function Lazy(): JSX.Element {
  const { ref, visible } = useLaze<HTMLDivElement>();

  return (
    <h1 ref={ref} className={visible ? 'visible' : 'hidden'}>
      I am now visible!
    </h1>
  );
}

function App(): JSX.Element {
  const [remount, setRemount] = useState('A');

  return (
    <div>
      <div>
        <button
          type="button"
          className="reset"
          onClick={() => {
            setRemount(
              remount === 'A' ? 'B' : 'A',
            );
          }}
        >
          Remount!
        </button>
      </div>
      <div key={remount}>
        {
          [...(new Array<never>(1000))].map(() => (
            <Lazy />
          ))
        }
      </div>
    </div>
  );
}

export default App;
