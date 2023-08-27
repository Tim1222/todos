import {action} from '@storybook/addon-actions'
import {EditableStan} from "./EditableStan";

export default {
    title: "EditableSpan Component",
    component: EditableStan
}

const changeCallback = action('Value changed')

export const EditableSpanBaseExample = () => {
    return <EditableStan title={'Start value'} onChange={changeCallback} />
}