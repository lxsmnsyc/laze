import type { JSX } from 'preact';
import { createContext } from 'preact';
import useLaze from 'preact-laze';
import { useContext, useState } from 'preact/hooks';

const RefreshContext = createContext(false);

interface LazyProps {
  value: number;
}

function Lazy({ value }: LazyProps): JSX.Element {
  const { ref, visible } = useLaze<HTMLDivElement>({
    refresh: useContext(RefreshContext),
  });

  return (
    <h1 ref={ref} className={visible ? 'visible' : 'hidden'}>
      {`Item #${value} is now visible!`}
    </h1>
  );
}

function App(): JSX.Element {
  const [remount, setRemount] = useState('A');
  const [refresh, setRefresh] = useState(false);

  return (
    <div>
      <div className="reset-container">
        <div className="reset-buttons">
          <button
            type="button"
            className="reset"
            onClick={() => {
              setRemount(remount === 'A' ? 'B' : 'A');
            }}
          >
            Remount!
          </button>
          <button
            type="button"
            className="reset"
            onClick={() => {
              setRefresh(!refresh);
            }}
          >
            {`Refresh: ${refresh ? 'On' : 'Off'}`}
          </button>
        </div>
      </div>
      <div key={remount}>
        <RefreshContext.Provider value={refresh}>
          {[...new Array<never>(1000)].map((_, index) => (
            <Lazy value={index} />
          ))}
        </RefreshContext.Provider>
      </div>
    </div>
  );
}

export default App;
