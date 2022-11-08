<template>
  <div>
    <div class="card-item">
      <strong>PROMO</strong>
      <p>{{ promo.title }}</p>
    </div>
    <div class="card-item">
      <strong>COUNTRY</strong>
      <p>{{ promo.operator.country?.name }}</p>
    </div>
    <div class="card-item">
      <strong>OPERATOR</strong>
      <p>{{ promo.operator?.name }}</p>
    </div>
    <div class="card-item">
      <strong>DESCRIPTION</strong>
      <p>{{ promo.description }}</p>
    </div>
    <div class="card-item">
      <strong>STARTS</strong>
      <p>{{ promo.start_date }}</p>
    </div>
    <div class="card-item">
      <strong>ENDS</strong>
      <p>
        {{ promo.end_date }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    promo: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
