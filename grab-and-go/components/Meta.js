import Head from 'next/head'

const Meta = ({ title, keywords, description }) => {
  return (
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='keywords' content={keywords} />
      <meta name='description' content={description} />
      <meta charSet='utf-8' />
      <link rel='icon' href='/favicon.ico' />
      <title>{title}</title>
      <script async
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAOJDDyL012DooU8FHDbH8yLARMV7L4U-o&callback=initMap">
</script>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp" crossorigin="anonymous" /> 
    </Head>
  )
}

Meta.defaultProps = {
  title: 'Grab and Go',
  keywords: 'order service',
  description: 'Order and pick up products from different stores',
}

export default Meta