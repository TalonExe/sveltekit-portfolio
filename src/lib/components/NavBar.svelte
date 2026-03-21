<script>
    import routes from "$lib/NavRoutes";


</script>

<div class="navbar fixed top-0 left-0 z-50 w-full bg-transparent">
  <div class="flex-1">
    <!-- eslint-disable-next-line -->
    <a class="btn btn-ghost text-xl font-[Ka1]" href="/">HL.dev</a>
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal px-1">
        {#each routes as route (route.href)}
            <li>
              <a href={route.href}>{route.name}</a>
            </li>
        {/each}
    </ul>
  </div>
</div>