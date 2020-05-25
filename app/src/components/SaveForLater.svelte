<script>
  import { _, getMessageFormatter } from "svelte-i18n";
  import copy from "copy-to-clipboard";
  import toastr from "toastr";

  import CollapsableIntroduction from "./CollapsableIntroduction.svelte";
  import * as save from "../modules/save";

  export let state;

  function saveWithMessage(callback) {
    toastr.options = {
      "positionClass" : "toast-top-center"
    }

    try {
      callback();
      toastr.success("Save success.");
    } catch (_) {
      toastr.error("Save failed.");
    }
  }

  function openInTab(event) {
    event.preventDefault();
    window.open(save.saveAsUrl(state), "_blank");
  }

  function copyToClipboard(event) {
    event.preventDefault();
    saveWithMessage(() => copy(window.location.href + save.saveAsUrl(state)));
  }

  function saveAsFile() {
    saveWithMessage(() => { save.saveAsFile(state) })
  }

  const supportsBlobsAndObjectUrl = Blob && window.URL && window.URL.createObjectURL
</script>

<section>
  <div class="container">
    <div class="row vkb-secondary-color">
      <div class="col">
        <h2>{ $_("saveForLater.title") }</h2>
      </div>
    </div>
    <CollapsableIntroduction>
      <span slot="introduction">
        { $_("saveForLater.introduction") }
      </span>
      <span slot="help">
        {#if supportsBlobsAndObjectUrl}
          <p>
            { $_("saveForLater.asFileDescription") }
          </p>
        {/if}
        <p>
          { $_("saveForLater.asLinkDescription") }
        </p>
        { $_("saveForLater.asLocalStorageDescription") }
      </span>
    </CollapsableIntroduction>
    <div class="row">
      <div class="col">
        <ul class="list-group">
          {#if supportsBlobsAndObjectUrl}
            <li class="list-group-item">
              <div class="md-v-line pointer" on:click={ saveAsFile }></div>
              <i class="fas fa-download mr-5"></i>
              { $_("saveForLater.asFile") }
            </li>
          {/if}
          <li class="list-group-item">
            <div class="md-v-line pointer" data-toggle="modal" data-target="#saveAsLinkModal"></div>
            <i class="fas fa-external-link-alt mr-5"></i>
            { $_("saveForLater.asLink") }
          </li>
          <li class="list-group-item">
            <div class="md-v-line pointer" on:click={() => saveWithMessage(() => { save.saveToLocalStorage(state) }) }></div>
            <i class="fas fa-archive mr-5"></i>
            { $_("saveForLater.asLocalStorage") }
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="modal fade" id="saveAsLinkModal" tabindex="-1" role="dialog" aria-labelledby="saveAsLinkModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="saveAsLinkModalLabel">  { $_("saveForLater.asLink") }</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>
            <a href="#saveAsLinkModal" on:click={ openInTab }>
              { $_("saveForLater.clickHereForTab") } &nbsp;
              <i class="fas fa-external-link-alt"></i>
            </a>
            .
            { $_("saveForLater.orClickHereBeforeHere") } <a href="#saveAsLinkModal" on:click={ copyToClipboard }>{ $_("saveForLater.orClickHere") }</a> { $_("saveForLater.orClickHereAfterHere") }.
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</section>
