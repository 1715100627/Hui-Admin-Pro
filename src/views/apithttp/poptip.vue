// '/components/MarkPoptip.vue'


<template>
    <Poptip
        confirm
        title="确定要删除吗??"
        @on-ok="ok"
        @on-cancel="cancel"
        ok-text="yes"
        cancel-text="no"
        transfer
        style="display : inline-block"
    >
        <Button  type="text" size="small" style="color: rgb(255, 153, 0);padding-left: 0px;padding-right: 0px;border-bottom-width: 2px; ">删除</Button>
    </Poptip>
</template>

<script>
import { envdelete } from '../../api/api'

    export default {
        mounted() {
        },
        props: {
            job_id : {
                default: 0,
                type: Number,
            }
        },
        methods: {

        }
    }
</script>