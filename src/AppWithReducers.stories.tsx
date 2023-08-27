import {action} from '@storybook/addon-actions'
import {EditableStan} from "./EditableStan";
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./state/store";
//import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";

export default {
    title: "AppWithRedux Component",
    component: AppWithRedux,
    // decorators: [ReduxStoreProviderDecorator]
}

export const AppWithReduxBaseExample = () => {
    return <AppWithRedux/>
}