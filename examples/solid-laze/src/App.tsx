import { createContext, useContext, createSignal, JSX } from 'solid-js';
import useLaze from 'solid-laze';

const RefreshContext = createContext(false);

interface LazyProps {
  value: number;
}

function Lazy(props: LazyProps): JSX.Element {
  const laze = useLaze<HTMLDivElement>({
    refresh: useContext(RefreshContext),
  });

  return (
    <h1 ref={laze.ref} className={laze.visible ? 'visible' : 'hidden'}>
      {`Item #${props.value} is now visible!`}
    </h1>
  );
}

function App(): JSX.Element {
  const [remount, setRemount] = createSignal(true);
  const [refresh, setRefresh] = createSignal(false);

  return (
    <div>
      <div className="reset-container">
        <div className="reset-buttons">
          <button
            type="button"
            className="reset"
            onClick={() => {
              setRemount(false);
              setRemount(true);
            }}
          >
            Remount!
          </button>
          <button
            type="button"
            className="reset"
            onClick={() => {
              setRefresh(!refresh());
            }}
          >
            {`Refresh: ${refresh() ? 'On' : 'Off'}`}
          </button>
        </div>
      </div>
      {
        remount() && (
          <div>
            <RefreshContext.Provider value={refresh()}>
              {
                [...(new Array<never>(1000))].map((_, index) => (
                  <Lazy value={index} />
                ))
              }
            </RefreshContext.Provider>
          </div>
        )
      }
    </div>
  );
}

export default App;
