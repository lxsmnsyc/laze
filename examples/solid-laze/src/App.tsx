import type { JSX } from 'solid-js';
import { createContext, createSignal, useContext } from 'solid-js';
import useLaze from 'solid-laze';

const RefreshContext = createContext<() => boolean>(() => false);

interface LazyProps {
  value: number;
}

function Lazy(props: LazyProps): JSX.Element {
  const refresh = useContext(RefreshContext);
  const laze = useLaze<HTMLDivElement>({
    get refresh() {
      return refresh();
    },
  });

  return (
    <h1 ref={laze.ref} class={laze.visible ? 'visible' : 'hidden'}>
      {`Item #${props.value} is now visible!`}
    </h1>
  );
}

function App(): JSX.Element {
  const [remount, setRemount] = createSignal(true);
  const [refresh, setRefresh] = createSignal(false);

  return (
    <div>
      <div class="reset-container">
        <div class="reset-buttons">
          <button
            type="button"
            class="reset"
            onClick={() => {
              setRemount(false);
              setRemount(true);
            }}
          >
            Remount!
          </button>
          <button
            type="button"
            class="reset"
            onClick={() => {
              setRefresh(!refresh());
            }}
          >
            {`Refresh: ${refresh() ? 'On' : 'Off'}`}
          </button>
        </div>
      </div>
      {remount() && (
        <div>
          <RefreshContext.Provider value={refresh}>
            {[...new Array<never>(1000)].map((_, index) => (
              <Lazy value={index} />
            ))}
          </RefreshContext.Provider>
        </div>
      )}
    </div>
  );
}

export default App;
