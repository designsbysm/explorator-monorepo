const envURL = import.meta.env.VITE_SERVER_URL;

const serverURL = envURL || `${window.location.origin}`;

export { serverURL };
