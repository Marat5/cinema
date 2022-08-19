<script>
  export let count = -1;
  let m = { x: 0, y: 0 };
  let doubled = 0;
  $: {
    if (count > 10) {
      break $;
    }

    doubled = count * 2;
    console.log(count, doubled);
  }

  const increment = () => {
    count += 1;
  };
</script>

<p on:mousemove={(e) => (m = { x: e.clientX, y: e.clientY })}>
  {count} doubled is {doubled}
  {m.y}
  {m.x}
</p>
<button on:click={increment}>
  count is {count}
</button>
