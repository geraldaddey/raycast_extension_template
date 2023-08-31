// Importing Detail component from Raycast API, React Markdown and useFetch hook from Raycast Utils
import { Detail } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import ReactMarkdown from "react-markdown";


// Importing CustomerData interface from customer_interface.ts file
import { CustomerData } from "./models/customer_inteface";

// Exporting a default function named Command
export default function Command() {
  // Destructuring isLoading, data and error from the useFetch hook
  const { isLoading, data, error } = useFetch<CustomerData>("http://127.0.0.1:3000/api/v1/customers");

  // If the data is still loading, return a Detail component with a loading message
  if (isLoading) {
    return <Detail markdown={`Loading...`} />;
  }

  // If there is an error, return a Detail component with an error message
  if (error) {
    return <Detail markdown={`Error: ${error.message}`} />;
  }

  // If there is no data, return a Detail component with a message indicating no data was found
  if (!data) {
    return <Detail markdown="No data found" />;
  }

  // Destructuring status, message and customerInfo from the data object
  const { status, message, data: customerInfo } = data;

  // Mapping over the customerInfo array and destructuring id, name, email and phone from each customer object
  const customerDetails = customerInfo?.map((customer) => {
    const { id, name, email, phone } = customer;
    return { id, name, email, phone };
  });

  const customerTable = customerDetails
    ?.map((customer) => {
      return `| ${customer.id} | ${customer.name} | ${customer.email} | ${customer.phone} |`;
    })
    .join("\n");

  if (data) {
    console.log(status);
    console.log(message);
  }

  // Returning a Detail component with the status, message and customerDetails objects as markdown
  return (
    <Detail
      markdown={`# Customer RayCast Extension    \n\n| ID | Name | Email | Phone |\n| --- | --- | --- | --- |\n${customerTable}`}
    />
  );
}
