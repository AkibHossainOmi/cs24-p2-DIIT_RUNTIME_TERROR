const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const rbacRoutes = require('./routes/rbacRoutes');
const profileRoutes = require('./routes/profileRoutes');
const roleRoutes = require('./routes/roleRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const stsVehicleRoutes = require('./routes/stsVehicleRoutes');
const stsRoutes = require('./routes/stsRoutes');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/rbac', rbacRoutes);
app.use('/profile', profileRoutes); 
app.use('/roles', roleRoutes);
app.use('/vehicles', vehicleRoutes);
app.use('/sts-vehicles', stsVehicleRoutes);
app.use('/sts', stsRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});