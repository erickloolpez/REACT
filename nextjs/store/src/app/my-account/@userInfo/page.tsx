
import { validateAccessToken } from "app/utils/auth/validateAccessToken";

export default async function MyAccountPage() {
  const customer = await validateAccessToken();

  return (
    <div>
      <section>
        <h1>Your info</h1>
        <h2>Bienvenido {customer.name}</h2>
        <p>email: {customer.email}</p>
      </section>
    </div>
  );
}