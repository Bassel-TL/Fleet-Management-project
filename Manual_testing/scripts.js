var request = new XMLHttpRequest()


request.open('GET', 'https://3ef8d4a2trial-dev-fleetmanagement-srv.cfapps.eu10.hana.ondemand.com/admin/Cities', true)
request.onload = function () {
  this.response.headers.set("Access-Control-Allow-Origin", "*");
  this.response.status = 200;
  var data = JSON.parse(this.response)

  if (request.status >= 200 && request.status < 400) {
    data.forEach((movie) => {
      console.log(movie.title)
    })
  } else {
    console.log('error')
  }
}

request.send()