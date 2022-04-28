import React from 'react';
import Input from '../../common/components/Input/Input';


const CorrespondenceForm = () => {
  return (
    <>
      <div className='corresp-container'>
        <div className="allPostTitle-cont">
            <div className='allPostTitle'>RECEIVE CORRESPONDENCE</div>
        </div>

        <div className="corresp-subtitle-cont">   
          <div className="corresp-subtitle">
            <p className=''>Package Information</p>
          </div>
        </div>

        <div className="corresp-input-cont">   
          <div className="corresp-inputs"> 
            <div className="">
            
              <p className='corresp-input-title'>QR</p>
              <Input
                  // id="titleinput"
                  name="qr"
                  type="text"
                  placeholder="Scan QR"
                  classInput="corresp-input"
              /> 
            </div>  

            <div className="">
              <p className='corresp-input-title'>Type</p>
              <Input
                  // id="titleinput"
                  name="type"
                  type="text"
                  placeholder="Type of correspondence"
                  classInput="corresp-input"
              /> 
            </div>  

            <div className=''>
              <p className='corresp-input-title'>Category</p>
              <select name='category' className="corresp-input">
                <option value="" disabled selected>Select a category</option>
              </select>
            </div>

            <div className=''>
              <p className='corresp-input-title'>State</p>
              <select name='category' className="corresp-input">
                <option value="" disabled selected>Select a state</option>
              </select>
            </div>  
          </div>
        </div>

        <div className="corresp-subtitle-cont">   
          <div className="corresp-subtitle">
            <p className=''>Delivery Details</p>
          </div>
        </div>

        <div className="corresp-input-cont">
          <div className="corresp-inputs">
            <div className="">
              <p className='corresp-input-title'>First Name</p>
              <Input
                  // id="titleinput"
                  name="firstname"
                  type="text"
                  placeholder="Enter the first name"
                  classInput="corresp-input"
              /> 
            </div>  

            <div className="">
              <p className='corresp-input-title'>Last Name</p>
              <Input
                  // id="titleinput"
                  name="lastname"
                  type="text"
                  placeholder="Enter the last name"
                  classInput="corresp-input"
              /> 
            </div>  

            <div className="">
              <p className='corresp-input-title'>Document Number</p>
              <Input
                  // id="titleinput"
                  name="document"
                  type="text"
                  placeholder="Enter the document number"
                  classInput="corresp-input"
              /> 
            </div>  

            <div className="">
              <p className='corresp-input-title'>Phone Number</p>
              <Input
                  // id="titleinput"
                  name="phone"
                  type="text"
                  placeholder="Enter the phone number"
                  classInput="corresp-input"
              /> 
            </div>  
          </div>
        </div>


        <div className="corresp-subtitle-cont">   
          <div className="corresp-subtitle">
            <p className=''>To and From</p>
          </div>
        </div>

        <div className="corresp-input-cont">
          <div className="corresp-inputs">
            <div className="">
              <p className='corresp-input-title'>To</p>
              <Input
                  // id="titleinput"
                  name="to"
                  type="text"
                  placeholder="Select or enter the destination"
                  classInput="corresp-input"
              /> 

                  <div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" defaultValue="option1" />
                      <label className="form-check-label" htmlFor="inlineRadio1">Departament</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" defaultValue="option2" />
                      <label className="form-check-label" htmlFor="inlineRadio2">Person</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" defaultValue="option3" />
                      <label className="form-check-label" htmlFor="inlineRadio3">Hold</label>
                    </div>
                  </div>
            </div>  

            <div className="">
              <p className='corresp-input-title'>From</p>
              <Input
                  // id="titleinput"
                  name="from"
                  type="text"
                  placeholder="Enter the Origin"
                  classInput="corresp-input"
              /> 
            </div>  
          </div>
        </div>

        <div className='allpost-btn-cont'>
            <div className='allpost-btns'>
              <button  className="btn-done" name="btn-done" type="submit">Done</button> 
              <button  className="btn-clear" name="btn-clear" type="submit">Clear</button>
            </div>
        </div>

      </div>
    </>
  )
}

export default CorrespondenceForm