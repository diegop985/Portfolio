export const fileUpload = async ( file ) => {
  if ( !file ) throw new Error( 'Missing file to upload' );
  const cloudURL = 'https://api.cloudinary.com/v1_1/djneziuih/upload';

  const formData = new FormData();
  formData.append( 'upload_preset', 'react-app' );
  formData.append( 'file', file );

  try {
    const resp = await fetch( cloudURL, {
      method: 'POST',
      body: formData,
    } );

    if ( !resp.ok ) throw new Error( 'Can\'t upload image' );

    const cloudResp = await resp.json();

    return cloudResp.secure_url;
  } catch ( error ) {
    throw new Error( error.message );
  }
};
