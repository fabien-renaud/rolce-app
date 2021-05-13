import {Button, Drawer} from 'antd';
import {ReactNode} from 'react';
import {SavingStatus} from '../../utils';

type FormDrawerProps = {
    cancelText: string;
    onCancel: () => void;
    submitText: string;
    onSubmit: () => void;
    saving: SavingStatus;
    title: string;
    visible: boolean;
    children: ReactNode;
};

const FormDrawer = ({children, visible, title, cancelText, onCancel, submitText, onSubmit, saving}: FormDrawerProps) => (
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
                <Button onClick={onSubmit} type="primary" loading={saving === 'Saving'}>
                    {submitText}
                </Button>
            </div>
        }>
        {children}
    </Drawer>
);

export default FormDrawer;
