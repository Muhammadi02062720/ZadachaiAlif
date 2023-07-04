import React, { useEffect, useState } from 'react'
import './App.css'
import { Button, Form, Input, Modal, Popconfirm, Table, Typography } from 'antd'
import AddIcon from '@mui/icons-material/Add';
import { EditFilled , DeleteFilled} from "@ant-design/icons";
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUsers, getUsers, patchUsers, postUsers } from './api/users';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';

const App = () => {
  const [form] = Form.useForm();
  const { Title } = Typography;
  const dispatch = useDispatch();
  const [editModal, setEditModal] = useState(false);
  const [idx, setIdx] = useState(null);
  const users = useSelector(({ users }) => users.users);

  const [addModal, setAddModal] = useState(false);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city"
    },
    {
      title: "Job",
      dataIndex: "job",
      key: "job"
    },{
      title: "Phone",
      dataIndex: "phone",
      key: "phone"
    },
    {
      title: "Action",
      render: (row) => {
        
        return (
          <>
           <EditNoteIcon
            style={{ cursor: "pointer", fontSize: 25 }}
            onClick={() => {
              form.setFieldsValue({
                name: row.name,
                city: row.city,
                job: row.job,
                phone: row.phone
              });
              setIdx(row.id);
              setEditModal(true);
            }}
          />
          <Popconfirm
              title="Sure to delete?"
              onConfirm={() => dispatch(deleteUsers(row.id))}
            >
              <DeleteIcon style={{ cursor: "pointer", fontSize: 25 }} />
            </Popconfirm>
          </>
         
        );
      },
    },
  ];
  
  const onFinish = async (values) => {
    let newUser = { ...values };
   
    dispatch(postUsers(newUser));
    setAddModal(false);
  };

  const onFinishUpdate = async (values) => {
    let change = { ...values };

    dispatch(patchUsers({ change, id: idx }));
    setEditModal(false);
  };
  
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  return (
    <div className='container1 mt-10'>
      <div >
      <Title level={2}>UserList</Title>
      <Button className='bg-[#26267d] text-white float-right mb-5' onClick={() => setAddModal(true)}>
      <AddIcon/>add
      </Button>
      </div>
      <Table rowKey={(row) => row.id} dataSource={users} columns={columns} />
      <Modal
        title="Add Modal"
        open={addModal}
        footer={false}
        onCancel={() => setAddModal(false)}
        destroyOnClose
      >
        <Form name="add" onFinish={onFinish} autoComplete="off">
          <Form.Item
            label="Name"
            name="name"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your name !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="City"
            name="city"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your City!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Job"
            name="job"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your JOb!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your Phone!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button className='bg-[#26267d] text-white'  htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Edit Modal"
        open={editModal}
        footer={false}
        getContainer={false}
        onCancel={() => setEditModal(false)}
        destroyOnClose
      >
        <Form
          form={form}
          name="edit"
          onFinish={onFinishUpdate}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your Name !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="City"
            name="city"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your City!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Job"
            name="job"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your Job!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your Phone!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button className='bg-[#26267d] text-white float-right mb-5' htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default App