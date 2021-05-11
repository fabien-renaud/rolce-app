import {Button, Drawer} from 'antd';
import {ReactNode} from 'react';

type FormDrawerProps = {
    cancelText: string;
    onCancel: () => void;
    submitText: string;
    onSubmit: () => void;
    title: string;
    visible: boolean;
    children: ReactNode;
};

const FormDrawer = ({children, visible, title, cancelText, onCancel, submitText, onSubmit}: FormDrawerProps) => (
    <Drawer
        title={title}
        visible={visible}
        placement="top"
        closable
        key="FormDrawer"
        height={500}
        onClose={onCancel}
        footer={
            <div
                style={{
                    textAlign: 'right'
                }}>
                <Button onClick={onCancel} style={{marginRight: 8}}>
                    {cancelText}
                </Button>
                <Button onClick={onSubmit} type="primary">
                    {submitText}
                </Button>
            </div>
        }>
        {children}
    </Drawer>
);

export default FormDrawer;
