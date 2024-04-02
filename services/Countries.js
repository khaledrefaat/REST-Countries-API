export async function loadCountries() {
  const request = await fetch('/data.json');
  app.store.countries = await request.json();
}
