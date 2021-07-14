    
import styled from 'styled-components';

export const Container = styled.div`
display: block;
flex: 2;
overflow-y: overlay;
padding: 0 15px;
`;

export const MessageItemMe = styled.div`
display: inline-block;
position: relative;
max-width: 100%;
border-radius: 7px;
box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
margin-top: 10px;
margin-bottom: 10px;
clear: both;
&::after {
  content: '';
  display: table;
  clear: both;
}
&::before {
  content: '';
  position: absolute;
  bottom: 3px;
  width: 12px;
  height: 19px;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: contain;
}
float : right;
background-color : #dcf8c6;
&::before {
    right : -11px;
    background-image : url(/assets/message-mine.png);
}`;


export const MessageItemFrom = styled.div`
display: inline-block;
position: relative;
max-width: 100%;
border-radius: 7px;
box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
margin-top: 10px;
margin-bottom: 10px;
clear: both;
&::after {
  content: '';
  display: table;
  clear: both;
}
&::before {
  content: '';
  position: absolute;
  bottom: 3px;
  width: 12px;
  height: 19px;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: contain;
}
float : left;
background-color : #FFC0CB;
&::before {
    right : -11px;
    background-image : url(/assets/message-other.png);
}`;

export const Contents = styled.div`
padding: 5px 7px;
word-wrap: break-word;
&::after {
  content: ' \\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0';
  display: inline;
}
`;

export const Timestamp = styled.div`
position: absolute;
bottom: 2px;
right: 7px;
color: gray;
font-size: 12px;
`;