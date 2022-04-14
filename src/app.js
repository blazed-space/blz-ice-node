

const element = document.getElementById(config.util.target);
const app = new Ice({
    target: element,
    props: {config}
});

window.app = app;
export default app;
