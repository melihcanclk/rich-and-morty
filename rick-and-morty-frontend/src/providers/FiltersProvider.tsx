import { store } from "@/store/store";
import { Provider } from "react-redux";

const FiltersProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};

export default FiltersProvider;