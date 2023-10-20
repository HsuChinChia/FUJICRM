
import { defineComponent, getCurrentInstance, reactive, toRefs, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
interface Node {
  p3_bne_name?: string;
  crud: number;
  p4_node_id: number;
  p4_node_name: string;
  p4_node_pid?: number;
  p4_node_route?: string;
}
export function PrototypesCrud() {
  const crud = (): number => {
    const { proxy }: any = getCurrentInstance();
    const localNodes: string | null = localStorage.getItem('Node');
    if (localNodes) {
      const userNodes: Node[] = JSON.parse(localNodes);
      const [currentNode]: any = userNodes.filter(
        (node: Node): boolean => node.p4_node_route === proxy.$route.meta.url,
      );
      if (typeof currentNode === 'object') {
        return currentNode.crud;
      }
    }
    return 0;
  }

  const getCrud = (path: string): number => {
    const localNodes: string | null = localStorage.getItem('Node');
    if (localNodes) {
      const userNodes: Node[] = JSON.parse(localNodes);
      const [currentNode]: any = userNodes.filter(
        (node: Node): boolean => node.p4_node_route === path,
      );
      if (typeof currentNode === 'object') {
        return currentNode.crud;
      }
    }
    return 0;
  }


  return { crud, getCrud };
}