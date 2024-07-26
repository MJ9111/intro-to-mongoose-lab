const prompt = require('prompt-sync')();
const dotenv = require('dotenv');
dotenv.config();
const Customer = require('./models/Customer.js');
const mongoose = require('mongoose');

// Connect to MongoDB
const connect = async () => {
  
await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, use })
  
console.log('Connected to MongoDB');
} 
// Display welcome message
console.log('Welcome to the CRM');

// Function to display menu
function displayMenu() {
  console.log('What would you like to do?');
  console.log('  1. Create a customer');
  console.log('  2. View all customers');
  console.log('  3. Update a customer');
  console.log('  4. Delete a customer');
  console.log('  5. Quit');
}

// Function to handle user choice
function handleUserChoice() {
  const choice = prompt('Number of action to run: ');
  switch (choice) {
    case '1':
      createCustomer();
      break;
    case '2':
      viewCustomers();
      break;
    case '3':
      updateCustomer();
      break;
    case '4':
      deleteCustomer();
      break;
    case '5':
      quitApplication();
      break;
    default:
      console.log('Invalid choice. Please choose a valid option.');
      displayMenu();
      handleUserChoice();
  }
}

// Function to create a customer
function createCustomer() {
  const name = prompt('Enter customer name: ');
  const age = prompt('Enter customer age: ');
  const customer = new Customer({ name, age });
  customer.save((err, customer) => {
    if (err) {
      console.log('Error creating customer:', err);
    } else {
      console.log('Customer created successfully:', customer);
    }
    displayMenu();
    handleUserChoice();
  });
}

// Function to view all customers
function viewCustomers() {
  Customer.find({}, (err, customers) => {
    if (err) {
      console.log('Error fetching customers:', err);
    } else {
      console.log('Customers:');
      customers.forEach((customer) => {
        console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`);
      });
    }
    displayMenu();
    handleUserChoice();
  });
}

// Function to update a customer
function updateCustomer() {
  Customer.find({}, (err, customers) => {
    if (err) {
      console.log('Error fetching customers:', err);
    } else {
      console.log('Customers:');
      customers.forEach((customer) => {
        console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`);
      });
      const id = prompt('Enter id of customer to update: ');
      const name = prompt('Enter new customer name: ');
      const age = prompt('Enter new customer age: ');
      Customer.findByIdAndUpdate(id, { name, age }, (err, customer) => {
        if (err) {
          console.log('Error updating customer:', err);
        } else {
          console.log('Customer updated successfully:', customer);
        }
        displayMenu();
        handleUserChoice();
      });
    }
  });
}

// Function to delete a customer
function deleteCustomer() {
  Customer.find({}, (err, customers) => {
    if (err) {
      console.log('Error fetching customers:', err);
    } else {
      console.log('Customers:');
      customers.forEach((customer) => {
        console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`);
      });
      const id = prompt('Enter id of customer to delete: ');
      Customer.findByIdAndDelete(id, (err, customer) => {
        if (err) {
          console.log('Error deleting customer:', err);
        } else {
          console.log('Customer deleted successfully:', customer);
        }
        displayMenu();
        handleUserChoice();
      });
    }
  });
}

// Function to quit application
function quitApplication() {
  console.log('Exiting application...');
  mongoose.connection.close();
  process.exit(0);
}

// Start application
displayMenu();
handleUserChoice();