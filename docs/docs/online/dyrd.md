<script>
axios('https://api.iyk0.com/dyrd/').then(dt=>{
  console.log(JSON.parse(dt.data.split('\n')[0]))
}).catch(console.log)
</script>