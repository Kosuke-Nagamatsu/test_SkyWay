3.times do |n|
  User.create!(
    name: "ユーザ#{n + 1}",
    email: "user#{n + 1}@example.com",
    password: 'password',
    peer_id: [*'A'..'Z', *'a'..'z', *'0'..'9'].sample(16).join
  )
end