const myTimer = () => {
  const date = new Date()
  document.getElementById('display').innerHTML = date.toLocaleTimeString()
}
setInterval(myTimer, 1000)
