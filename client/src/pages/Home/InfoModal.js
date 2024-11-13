import React from 'react'
import { Modal,Descriptions } from 'antd'

function InfoModal({isInfoOpen,setIsInfoOpen,selectedSeatsLen,price}) {   
  return (
    <div>
        <Modal
        open={isInfoOpen}
        title={"Price Breakup"}
        onCancel={()=>{setIsInfoOpen(false)}}
        footer={null}
        >
            <Descriptions column={1} >
            <Descriptions.Item label="Base Price">{`Rs. ${(selectedSeatsLen*price).toFixed(2)}`}</Descriptions.Item>
            <Descriptions.Item label="Convenience Charges">Rs. 0.00</Descriptions.Item>
            <Descriptions.Item label="Taxes @ 0 %">{`Rs. ${((selectedSeatsLen*price+0)*0.0).toFixed(2)}`}</Descriptions.Item>
            <Descriptions.Item label="Total Amount">{`Rs. ${((selectedSeatsLen*price+0)*1.0).toFixed(2)}`}</Descriptions.Item>
            </Descriptions>
        </Modal>

    </div>
  )
}

export default InfoModal