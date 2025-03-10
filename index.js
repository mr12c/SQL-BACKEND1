import app from "./src/app.js";
import connectDb from "./src/DB/index.js";

const PORT = process.env.PORT || 3000;









async function startServer() {
  let retries = 5;
  while (retries > 0) {
    try {
      const [result] = await connectDb.query('SELECT 1');
      console.log("Connected to Database");
      
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
      return; // Exit the function on successful connection
    } catch (err) {
      console.error(`Database connection failed (${retries} retries left):`, err);
      retries--;
      if (retries > 0) {
        console.log("Retrying in 3 seconds...");
        await new Promise(resolve => setTimeout(resolve, 3000));
      } else {
        console.error("Failed to connect to database after multiple attempts");
        process.exit(1);
      }
    }
  }
}







startServer();



 
 
 
 
 
 
 
 


 
 
 
 
 










