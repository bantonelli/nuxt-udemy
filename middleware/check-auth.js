export default function (context) {
    // No need for if/else context.req will be null if on client.
    // if (process.client) {
    //     context.store.dispatch('initAuth', null);
    // } else {
    //     context.store.dispatch('initAuth', context.req);
    // }
    context.store.dispatch('initAuth', context.req);
}