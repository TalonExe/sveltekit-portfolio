<script>
    import routes from "$lib/NavRoutes";
</script>

<div class="navbar bg-base-100 shadow-sm mb-24">
  <div class="flex-1">
    <a class="btn btn-ghost text-xl font-[Ka1]" href="/">havynliew.dev</a>
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal px-1">
        {#each routes as route}
            <li><a href={route.href}>{route.name}</a></li>
        {/each}
    </ul>
  </div>
</div>