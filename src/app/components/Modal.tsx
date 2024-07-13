'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../store/modalSlice';
import { RootState } from '../../../store';
import ScatterChart from './Chart';
import Button from './Button';
import axios from '../axios';
import { useSession } from 'next-auth/react';
import Cookies from 'js-cookie';
import { styled } from 'styled-components';
import Typography from './Typography';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const ModalWrapper = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 80%;
  height: 50%;
  display: inline-flex;
  overflow: auto;
`;

const CloseButtonWrapper = styled.div`
  display: flex;
  height: 50px;
  width: 50px;
  flex: 1 0 5%;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 80%;
  flex: 1 0 95%;
`;

const Modal: React.FC = () => {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const [token, setToken] = useState('');
  const isModalOpen = useSelector((state: RootState) => state.modal.isOpen);
  const modalContent = useSelector((state: RootState) => state.modal.content);
  const [modalInputValue, setModalInputValue] = useState<string>();

  useEffect(() => {
    if (status === 'authenticated') {
      const value = Cookies.get('next-auth.session-idToken');
      if (value) {
        setToken(value);
      }
    }
  }, [status]);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleSetAlarm = () => {
    if (modalInputValue && modalContent) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`/set-alarm/symbol/${modalContent.ticker}/targetPrice/${modalInputValue}`, {
            headers: {
              Authorization: 'Bearer ' + token
            }
          });
        } catch (error) {
          console.error('Error while fetching data', error);
        }
      };

      fetchData();
    }
  };

  function timestampToHour(timestamp: number): number {
    const date = new Date(timestamp);
    const hour = date.getHours();
    return hour;
  }

  if (!isModalOpen) return null;
  return (
    <ModalOverlay>
      <ModalWrapper>
        <ContentWrapper>
          <ScatterChart
            dataContent={modalContent?.results.map((result) => ({
              x: timestampToHour(result.t),
              y: result.o
            }))}
          />
          <InputWrapper>
            <Typography color="black">Set up Alarm for price is higher then: </Typography>
            <input value={modalInputValue} onChange={(event) => setModalInputValue(event.target.value)} type="number" />
            <Button onClick={() => handleSetAlarm()}>set alarm</Button>
          </InputWrapper>
        </ContentWrapper>
        <CloseButtonWrapper>
          <Button onClick={handleCloseModal}>X</Button>
        </CloseButtonWrapper>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default Modal;
