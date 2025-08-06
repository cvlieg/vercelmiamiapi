// api/proxy.js
export default async function handler(req, res) {
  const { barcode } = req.query;
  
  if (!barcode) {
    return res.status(400).json({
      "ResponseCode": "-1",
      "ResponseMessage": "Barcode parameter required"
    });
  }
  
  try {
    const response = await fetch(`http://158.69.181.62:8097/tracking_status_handler.php?barcode=${barcode}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Connection': 'keep-alive',
        'Referer': 'http://158.69.181.62:8097/',
        'Origin': 'http://158.69.181.62:8097'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.text();
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      "ResponseCode": "-1",
      "ResponseMessage": `Error connecting to API: ${error.message}`
    });
  }
}
