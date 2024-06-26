export function createUser(user) {
  return fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      ...user,
      image: `${
        user.gender === 'Male'
          ? 'https://www.pngkey.com/png/detail/988-9886269_blank-person-facebook-no-profile.png'
          : 'https://cdn.vectorstock.com/i/preview-1x/08/64/person-gray-photo-placeholder-woman-vector-23190864.jpg'
      }`,
      id: crypto.randomUUID(),
      conversations: [],
    }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Failed to create user')
    }
    return response.json()
  })
}

export function getUser(id) {
  return fetch(`http://localhost:3000/users/${id}`).then((response) => {
    if (!response.ok) {
      throw new Error('Failed to create user')
    }
    return response.json()
  })
}

export function getConversation(id) {
  return fetch(`http://localhost:3000/conversations/${id}`).then((response) => {
    if (!response.ok) {
      throw new Error('Failed to create user')
    }
    return response.json()
  })
}

export function getUsers() {
  return fetch(`http://localhost:3000/users`).then((response) => {
    if (!response.ok) {
      throw new Error('Failed to create user')
    }
    return response.json()
  })
}

export function addNewMessage({ newMessageOBJ, conversationID }) {
  return fetch(`http://localhost:3000/conversations/${conversationID}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(newMessageOBJ),
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Failed to create new message')
    }
    return response.json()
  })
}
