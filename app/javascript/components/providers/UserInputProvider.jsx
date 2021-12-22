import React, { createContext, useState } from 'react';

// 入力データをグローバルなStateで管理するためにContextを用意
export const UserInputContext = createContext({});

export const UserInputProvider = props => {
  const { children } = props;
  // currentStateという変数で入力データを管理
  const [currentState, setCurrentState] = useState({});

  return (
    <UserInputContext.Provider value={{ currentState, setCurrentState }}>
      {children}
    </UserInputContext.Provider>
  );
}