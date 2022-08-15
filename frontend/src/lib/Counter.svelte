<script>
  export let count;
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

<p>{count} doubled is {doubled}</p>
<button on:click={increment}>
  count is {count}
</button>
