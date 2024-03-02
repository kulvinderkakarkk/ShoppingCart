const call = (url, method, header, body = undefined) => {
  const obj = fetch(url, {
    method: method,
    headers: header,
    body: body?body: undefined,
  })
    .then((res) => res.json())
    .then(obj => obj)
    .catch(err => err)
    return obj;
};

export default call;