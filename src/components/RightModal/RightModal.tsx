import React from 'react';
import {Modal, Form, Input, Radio} from 'antd';

type RightModalProps = {
    visible: boolean;
};

const RightModal = ({visible}: RightModalProps) => {
    return (
        <Modal visible={visible} title="Form within a Modal" okText="Submit">
            <Form layout="vertical">
                <Form.Item label="Title">
                    <Input />
                </Form.Item>
                <Form.Item label="Description">
                    <Input type="textarea" />
                </Form.Item>
                <Form.Item className="collection-create-form_last-form-item">
                    <Radio.Group>
                        <Radio value="public">Public</Radio>
                        <Radio value="private">Private</Radio>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default RightModal;
