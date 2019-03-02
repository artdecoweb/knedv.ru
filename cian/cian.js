import rqt from 'rqt'

(async () => {
  const res = await rqt('https://www.cian.ru/sale/suburban/164631748/', {
    headers: {
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36',
    },
  })
  const re = /window\._cianConfig\['offer-card'\] = ([\s\S]+?);\s*<\/script>/
  const [,r] = re.exec(res) || []
  if (!r) throw new Error('did not find config')
  const j = JSON.parse(r)
  console.log(j[42].value.offerData.offer)
})()