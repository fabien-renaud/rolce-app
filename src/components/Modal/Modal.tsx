import React, {useState} from 'react';
import {Modal} from 'antd';

type ModalProps = {
    cancelText: string;
    okText: string;
    title: string;
    visible: boolean;
};

const CustomModal = ({cancelText, okText, title, visible}: ModalProps) => {
    const [isVisible, setVisible] = useState(visible);

    const handleCancel = () => setVisible(false);

    return <Modal visible={isVisible} title={title} okText={okText} cancelText={cancelText} onCancel={handleCancel} />;
};

export default CustomModal;
