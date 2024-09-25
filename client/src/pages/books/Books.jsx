import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useGetBooksQuery } from '../../features/apiSlice'
import { getError } from '../../utils/error';
import CustomCard from '../../components/CustomCard';
import { useNavigate } from 'react-router-dom';
import MotionDiv from '../../components/MotionDiv';
import Skeleton from 'react-loading-skeleton';

function Books() {

    const {data,isLoading,isError,error} = useGetBooksQuery();
  const navigate= useNavigate();

    useEffect(()=>{
       if(isError && error){
        getError(error);
       }     
    },[isError,error])

  return (
    <MotionDiv>

        <h2 className=''>Books</h2>
        {isLoading?
        
      
        <Row className="my-1" md={4} sm={2} xs={1}>
        {Array(20).fill().map((_, i) => (
          <Col className="p-2" key={i}>
            <Skeleton height={'5rem'} />
          </Col>
        ))}
      </Row>

:
        <Row className='my-1' md={4} sm={2} xs={1}>
            
         {data?.data?.map((book,i)=>(
            <Col className='p-2' key={book?.name}>
             <CustomCard borderColor={'#FF4500'} onClick={()=>navigate(`${i}`)} title={book?.name}/>
             </Col>
            ))}
        </Row>
}
    </MotionDiv>
  )
}

export default Books