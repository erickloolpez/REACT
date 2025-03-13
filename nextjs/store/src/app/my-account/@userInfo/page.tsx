
import { validateAccessToken } from "app/utils/auth/validateAccessToken";

export default async function MyAccountPage() {
  const customer = await validateAccessToken();

  return (
    <div>
      <h2>Account info</h2>
      <section>
        <h2>Nombre: {customer?.firstName}</h2>
        <p>email: {customer?.email}</p>
      </section>
    </div>
  );
}