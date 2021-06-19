import { useState } from 'preact/hooks';
import useLaze from 'preact-laze';

interface LazyProps {
  value: number;
}

function Lazy({ value }: LazyProps): JSX.Element {
  const { ref, visible } = useLaze<HTMLDivElement>();

  return (
    <h1 ref={ref} className={visible ? 'visible' : 'hidden'}>
      {`Item #${value} is now visible!`}
    </h1>
  );
}

function App(): JSX.Element {
  const [remount, setRemount] = useState('A');

  return (
    <div>
      <div className="reset-container">
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
          [...(new Array<never>(1000))].map((_, index) => (
            <Lazy value={index} />
          ))
        }
      </div>
    </div>
  );
}

export default App;
