import React, { useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
// 作成したContextをimport
import { UserInputContext } from '../providers/UserInputProvider';


export default function Base(props) {
  // react hook formを使用
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
  });

  // setCurrentState（入力データを更新する関数）を取得
  const { setCurrentState } = useContext(UserInputContext);

  const onSubmit = (data) => {
    props.handleNext();
    // react hook formから受け取った入力データを保存する
    setCurrentState((prev) => prev.Base = data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <TextField
            {...field}
            label="名前"
            variant="standard"
            placeholder="例) 山田 太郎"
            fullWidth
            margin="normal"
          />
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <TextField
            {...field}
            label="Eメール"
            variant="standard"
            placeholder="例) yamada@example.com"
            fullWidth
            margin="normal"
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <TextField
            {...field}
            label="パスワード"
            variant="standard"
            placeholder="例) password"
            fullWidth
            margin="normal"
          />
        )}
      />
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field }) => (
          <TextField
            {...field}
            label="パスワード確認"
            variant="standard"
            placeholder="例) password"
            fullWidth
            margin="normal"
          />
        )}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        margin="normal"
        fullWidth
        sx={{ mt: 3 }}
      >
        次へ
      </Button>
    </form>
  );
}