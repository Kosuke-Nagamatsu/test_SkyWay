import React, { useState } from 'react';
import { Container, Box, Stepper, Step, StepLabel } from '@mui/material';
import { UserInputProvider } from './providers/UserInputProvider';
import Base from './user_registrations/Base';
import Confirm from './user_registrations/Confirm';


const steps = ["基本項目", "入力確認"];

export default function SignUp() {
  // Stepperコンポーネントのインデックス番号の状態をactiveStepという変数で管理
  const [activeStep, setActiveStep] = useState(0);

  // インデックスに応じたコンポーネントを表示（0：入力フォーム  1：入力確認）
  const renderStepContent = (stepIndex, handleNext, handleBack) => {
    switch (stepIndex) {
      case 0:
        return <Base handleNext={handleNext} />;
      case 1:
        return <Confirm handleBack={handleBack} />;
      default:
        return "該当ページなし";
    }
  };

  // activeStepを更新
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // activeStepを更新
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {/* 用意したグローバルstateを参照するためにコンポーネントで囲む */}
        <UserInputProvider>
          {renderStepContent(activeStep, handleNext, handleBack)}
        </UserInputProvider>
      </Box>
    </Container>
  );
}
