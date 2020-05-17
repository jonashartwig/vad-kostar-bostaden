<script>
  import { _ } from "svelte-i18n";
  import * as save from "../modules/save";

  export let state;
</script>

<section>
  <div class="container">
    <div class="row vkb-secondary-color">
      <div class="col">
        <h2>{ $_("saveForLater.title") }</h2>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p>
          { $_("saveForLater.introduction") }
					<a class="badge collapse show multi-collapse-saveforlater collapse-no-transition" data-toggle="collapse" data-target=".multi-collapse-saveforlater" id="saveforlater-show-help" href="#saveforlater-help" role="button" aria-expanded="true" aria-controls="saveforlater-show-help saveforlater-show-help-1 saveforlater-show-help-2">{ $_("showMore") }...</a>
        </p>
        <p class="collapse multi-collapse-saveforlater" id="saveforlater-help">
          { $_("saveForLater.asFileDescription") }
        </p>
        <p class="collapse multi-collapse-saveforlater" id="saveforlater-help">
          { $_("saveForLater.asFileDescription") }
        </p>
        <p class="collapse multi-collapse-saveforlater" id="saveforlater-help-1">
          { $_("saveForLater.asLinkDescription") }
        </p>
        <p class="collapse multi-collapse-saveforlater" id="saveforlater-help-2">
          { $_("saveForLater.asLocalStorageDescription") }
					<a data-toggle="collapse" data-target=".multi-collapse-saveforlater" href="#saveforlater-help" class="badge" role="button" aria-expanded="true" aria-controls="saveforlater-help-1 saveforlater-help-2 saveforlater-show-help">{ $_("showLess") }...</a>
        </p>
        <ul class="list-group">
          <!--<li class="list-group-item">
            <div class="md-v-line pointer"></div>
            <i class="fas fa-download mr-5"></i>
            { $_("saveForLater.asFile") }
          </li>
          <li class="list-group-item">
            <div class="md-v-line pointer"></div>
            <i class="fas fa-external-link-alt mr-5"></i>
            { $_("saveForLater.asLink") }
          </li>-->
          <li class="list-group-item">
            <div class="md-v-line pointer" on:click={() => save.saveToLocalStorage(state) }></div>
            <i class="fas fa-archive mr-5"></i>
            { $_("saveForLater.asLocalStorage") }
          </li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col">
      </div>
    </div>
  </div>
</section>
