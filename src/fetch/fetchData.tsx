import { User } from "@/components/columns";

async function getData(): Promise<User[]> {
  const getEndpoint =
    "https://n913tmwy61.execute-api.us-east-2.amazonaws.com/items";

  try {
    const response = await fetch(getEndpoint);
    const users = await response.json();
    return users
  } catch (error) {
    console.error(`Fetch Error: ${error}`);
    return [];
  }
}

async function putUser(payload: User) {
  const putEndPoint =
    "https://n913tmwy61.execute-api.us-east-2.amazonaws.com/items";

  try {
    const response = await fetch(putEndPoint, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    const resPut = await response.json();
    console.log(resPut);
  } catch (error) {
    console.error(`Fetch Error: ${error}`);
  }
}

async function deleteUser(id: string) {
  const deleteEndPoint = `https://n913tmwy61.execute-api.us-east-2.amazonaws.com/items/${id}`;
  
  try {
    const response = await fetch(deleteEndPoint, {
      method: "DELETE",
    });
    const resDeletion = await response.json();
    console.log(resDeletion);
  } catch (error) {
    console.error(`Fetch Error: ${error}`);
  }
}

export {getData, putUser, deleteUser}

