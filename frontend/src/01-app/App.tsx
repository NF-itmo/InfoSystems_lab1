import { HomePage } from "@/02-pages/home";
import { ErrorNotifier } from "@/06-shared/lib/errorNotifier";
import { DataUpdatesProvider } from "@/06-shared/lib/data-updates";
import "./App.css";
import "./settings.css";

const App = () => {
  return (
    <ErrorNotifier>
      <DataUpdatesProvider>
        <HomePage/>
      </DataUpdatesProvider>
    </ErrorNotifier>
  );
}

export default App;
